using System;
using api.Data;
using api.DTOs;
using api.Extensions;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

public class PaymentsController(PaymentsService paymentsService, StoreContext context) : BaseApiController
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
    {
        var basket = await context.Baskets.GetBasketWithItems(Request.Cookies["BasketId"]);

        if (basket == null) return BadRequest("Problem With the basket");

        var intent = await paymentsService.CreateOrUpdatePaymentIntent(basket);

        if (intent == null) return BadRequest("Problem creating payment intent");

        basket.PaymentIntentId ??= intent.Id;
        basket.ClientSecret = intent.ClientSecret;

        if (context.ChangeTracker.HasChanges())
        {
            var result = await context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Problem updating basket with intent");
        }

        return basket.ToDto();
    }
}
