import os
from PIL import Image, ImageFilter

def main():
    img_path = 'public/images/scene-dawn.png'
    if not os.path.exists(img_path):
        print(f"Error: {img_path} not found")
        return
        
    img = Image.open(img_path)
    width, height = img.size
    print(f"Loaded image: {width}x{height}")
    
    pixels = img.load()
    
    # We will interpolate the center region horizontally to remove the text
    # Since the text is huge in the screenshot, we target y from 0 to 350
    # and x from 100 to 924.
    y_limit = 350
    x_start = 100
    x_end = 924
    x_width = x_end - x_start
    
    for y in range(0, y_limit):
        # Read colors from left and right boundaries (averaging to reduce noise)
        left_colors = [pixels[x, y] for x in range(50, x_start)]
        right_colors = [pixels[x, y] for x in range(x_end, x_end + 50)]
        
        # Average boundary colors
        r_l = sum(c[0] for c in left_colors) // len(left_colors)
        g_l = sum(c[1] for c in left_colors) // len(left_colors)
        b_l = sum(c[2] for c in left_colors) // len(left_colors)
        
        r_r = sum(c[0] for c in right_colors) // len(right_colors)
        g_r = sum(c[1] for c in right_colors) // len(right_colors)
        b_r = sum(c[2] for c in right_colors) // len(right_colors)
        
        for x in range(x_start, x_end):
            t = (x - x_start) / x_width
            r = int(r_l + t * (r_r - r_l))
            g = int(g_l + t * (g_r - g_l))
            b = int(b_l + t * (b_r - b_l))
            pixels[x, y] = (r, g, b)
            
    # Apply a local Gaussian blur to the edited region to smooth out any artifacts
    # We blur the center edited region plus a bit of the boundary to make it seamless
    box = (80, 0, 944, y_limit + 20)
    cropped = img.crop(box)
    blurred = cropped.filter(ImageFilter.GaussianBlur(radius=8))
    img.paste(blurred, box)
    
    img.save('public/images/scene-dawn.png')
    print("Successfully removed text watermark from scene-dawn.png up to y=350!")

if __name__ == '__main__':
    main()
