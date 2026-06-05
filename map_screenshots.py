import os
import glob
from PIL import Image
import numpy as np

dark_dir = "public/screenshots/dark screenshot"
light_dir = "public/screenshots/light screenshot"

dark_files = glob.glob(os.path.join(dark_dir, "*.jpg"))
light_files = glob.glob(os.path.join(light_dir, "*.jpg"))

print("Loaded files")

dark_imgs = {os.path.basename(f): Image.open(f).resize((128, 256)).convert('L') for f in dark_files}
light_imgs = {os.path.basename(f): Image.open(f).resize((128, 256)).convert('L') for f in light_files}

print("Resized and converted to grayscale")

for dark_name, d_img in dark_imgs.items():
    d_arr = np.array(d_img).astype(np.float32)
    best_match = None
    best_diff = float('inf')
    
    # Simple edge detection to ignore color inversions
    d_grad_x = np.abs(d_arr[:, 1:] - d_arr[:, :-1])
    d_grad_y = np.abs(d_arr[1:, :] - d_arr[:-1, :])
    
    for light_name, l_img in light_imgs.items():
        l_arr = np.array(l_img).astype(np.float32)
        
        l_grad_x = np.abs(l_arr[:, 1:] - l_arr[:, :-1])
        l_grad_y = np.abs(l_arr[1:, :] - l_arr[:-1, :])
        
        diff = np.sum(np.abs(d_grad_x - l_grad_x)) + np.sum(np.abs(d_grad_y - l_grad_y))
        
        if diff < best_diff:
            best_diff = diff
            best_match = light_name
            
    print(f"'{dark_name}': '{best_match}',")
