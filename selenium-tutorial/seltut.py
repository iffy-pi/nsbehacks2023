import os
import wget

# Install selenium module with pip and then we have the imports
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait


# To use selenium we need drivers for chrome
# Download latest release from https://chromedriver.chromium.org/
# Extract zip and take note of save location: C:/Users/omnic/local/chrome_driver/chromedriver.exe

# load chrome driver
driver = webdriver.Chrome("C:/Users/omnic/local/chrome_driver/chromedriver.exe")
