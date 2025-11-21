using System;
using api.Data;
using api.DTOs;
using api.Entities;
using api.Entities.OrderAggregate;
using api.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[Authorize]
public class OrdersController(StoreContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetOrders()
    {
        var orders = await context.Orders
        .ProjectToDto()
        .Where(x => x.BuyerEmail == User.GetUsername())
        .ToListAsync();

        return orders;

    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderDto>> GetOrderDetails(int id)
    {
        var order = await context.Orders
        .ProjectToDto()
        .Where(x => x.BuyerEmail == User.GetUsername() && id == x.Id)
        .FirstOrDefaultAsync();

        if (order == null) return NotFound();

        return order;
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
    {
        var basket = await context.Baskets.GetBasketWithItems(Request.Cookies["BasketId"]);

        if (basket == null || basket.Items.Count == 0 || string.IsNullOrEmpty(basket.PaymentIntentId))
            return BadRequest("Basket is empty or not found");

        var items = CreateOrderItems(basket.Items);
        if (items == null) return BadRequest("Out of stock");


        var subtotal = items.Sum(x => x.Price * x.Quantity);
        var deliveryFee = CalculationDeliveryFee(subtotal);

        var order = await context.Orders
        .Include(x => x.OrderItems)
        .FirstOrDefaultAsync(x => x.PaymentIntentId == basket.PaymentIntentId);

        if (order == null)
        {
            order = new Order
            {
                OrderItems = items,
                BuyerEmail = User.GetUsername(),
                ShippingAddress = orderDto.ShippingAddress,
                DeliveryFee = deliveryFee,
                Subtotal = subtotal,
                PaymentSummary = orderDto.PaymentSummary,
                PaymentIntentId = basket.PaymentIntentId
            };
            context.Orders.Add(order);
        }

        else
        {
            order.OrderItems = items;
        }

        var result = await context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Problem creating order");

        return CreatedAtAction(nameof(GetOrderDetails), new {id = order.Id}, order.ToDto());
    }

    private long CalculationDeliveryFee(long subtotal)
    {
        return subtotal > 1000 ? 0 : 500;
    }

    private List<OrderItem>? CreateOrderItems(List<BasketItem> items)
    {
        var OrderItems = new List<OrderItem>();

        foreach (var item in items)
        {
            if (item.Product.QuantityInStock < item.Quantity)
                return null;

            var OrderItem = new OrderItem
            {
                ItemOrdered = new ProductItemOrdered
                {
                    ProductId = item.Product.Id,
                    PictureUrl = item.Product.PictureUrl,
                    Name = item.Product.name
                },
                Price = item.Product.Price,
                Quantity = item.Quantity
            };
            OrderItems.Add(OrderItem);

            item.Product.QuantityInStock -= item.Quantity;
        }

        return OrderItems;
    }
}
