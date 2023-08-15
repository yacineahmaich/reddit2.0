export function useSelectFile(onSelect: (image: string) => void) {
  function handleSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    const selectedImage = e.target.files?.[0];

    if (!selectedImage) return;

    reader.readAsDataURL(selectedImage);
    reader.onload = (e) => {
      if (!e.target?.result) return;

      onSelect(e.target?.result as string);
    };
  }

  return { handleSelectFile };
}
