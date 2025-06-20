from PIL import Image, ImageDraw, ImageFont

# Step 1: Load image and convert to grayscale
img = Image.open("./static/img/face.png").convert("L")

# Step 2: Resize for ASCII resolution
new_width = 150
aspect_ratio = img.height / img.width
new_height = int(aspect_ratio * new_width * 0.5)  # 0.5 factor adjusts for character height
img = img.resize((new_width, new_height))

# Step 3: Map brightness to "0" and "1"
pixels = img.getdata()
chars = ['1' if pixel < 128 else '0' for pixel in pixels]
ascii_lines = [
    ''.join(chars[i:i + new_width])
    for i in range(0, len(chars), new_width)
]

# Step 4: Create output image
font_size = 10
font = ImageFont.load_default()  # or use truetype for smoother fonts
output_img = Image.new("RGB", (new_width * font_size, new_height * font_size), color="black")
draw = ImageDraw.Draw(output_img)

# Step 5: Draw characters
for y, line in enumerate(ascii_lines):
    for x, char in enumerate(line):
        draw.text((x * font_size, y * font_size), char, fill=(0, 255, 0), font=font)

# Step 6: Save output
output_img.save("./static/img/outputs/test.png")
