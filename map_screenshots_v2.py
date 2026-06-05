import os
import glob
from PIL import Image
import numpy as np

dark_dir = "public/screenshots/dark screenshot"
light_dir = "public/screenshots/light screenshot"

dark_files = glob.glob(os.path.join(dark_dir, "*.jpg"))
light_files = glob.glob(os.path.join(light_dir, "*.jpg"))

dark_imgs = {os.path.basename(f): Image.open(f).resize((256, 512)).convert('L') for f in dark_files}
light_imgs = {os.path.basename(f): Image.open(f).resize((256, 512)).convert('L') for f in light_files}

for dark_name, d_img in dark_imgs.items():
    d_arr = np.array(d_img).astype(np.float32)
    best_match = None
    best_diff = float('inf')
    
    for light_name, l_img in light_imgs.items():
        l_arr = np.array(l_img).astype(np.float32)
        
        # Since it's a dark/light mode toggle, invert the light image
        l_inv = 255.0 - l_arr
        
        # Calculate Mean Absolute Error
        diff = np.mean(np.abs(d_arr - l_inv))
        
        if diff < best_diff:
            best_diff = diff
            best_match = light_name
            
    print(f"'{dark_name}': '{best_match}', // diff: {best_diff:.2f}")
