import { UploadFile } from "@mui/icons-material";
import { FormControl, FormHelperText, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

// Native drag-and-drop (no react-dropzone) to avoid React 19 interop issues
// Keeps the same contract: sets a File with a preview URL via field.onChange

type Props<T extends FieldValues> = {
  name: keyof T;
} & UseControllerProps<T>;

export default function AppDropzone<T extends FieldValues>(props: Props<T>) {
  const { fieldState, field } = useController({ ...props });
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | File[] | null | undefined) => {
      if (!files || files.length === 0) return;
      const file = files[0] as File;
      if (!file.type?.startsWith("image/")) return; // only images
      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      field.onChange(fileWithPreview);
    },
    [field]
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    handleFiles(e.dataTransfer?.files ?? null);
  }, [handleFiles]);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      // reset the input so the same file can be selected again if needed
      e.currentTarget.value = "";
    },
    [handleFiles]
  );

  const dzStyles: React.CSSProperties = {
    display: "flex",
    border: "dashed 2px #767676",
    borderColor: "#767676",
    borderRadius: 5,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    flexDirection: "column",
    height: 200,
    width: 500,
    cursor: "pointer",
    userSelect: "none",
  };

  const dzActive: React.CSSProperties = {
    borderColor: "green",
    backgroundColor: "rgba(0,128,0,0.05)",
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          (e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement)?.click();
        }
      }}
    >
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={onInputChange}
      />
      <FormControl style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles} error={!!fieldState.error}
        onClick={(e) => {
          // forward click to the hidden input
          const input = (e.currentTarget.previousSibling || e.currentTarget.querySelector('input[type="file"]')) as HTMLInputElement | null;
          input?.click();
        }}
      >
        <UploadFile sx={{ fontSize: "100px" }} />
        <Typography variant="h4">Drop image here or click to select</Typography>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}