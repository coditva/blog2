---
external: false
author: "Utkarsh Maheshwari"
draft: true
publishDate: "1970-01-01 00:00:00"
title: "Putting the switchboard on WiFi"
snippet: "none"
image:
  src: "null"
  alt: "Putting the switchboard on WiFi"
tags: ["untagged"]
category: ""
---


Things needed
=============

1.  NodeMCU
2.  v5 Relay
3.  Step down transformer

How to
======

Programming the NodeMCU
-----------------------

### Setting up the environment

1.  Download the driver from [https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers) and install on your computer. This will allow your computer to talk to the NodeMCU.
2.  Install [NodeMCUTool](https://github.com/andidittrich/NodeMCU-Tool) on your computer. If you already have `npm` installed, just enter this command on the terminal: `npm install nodemcu-tool -g`

### Installing a firmware with required modules

You would need to build the firmware and flash it onto your NodeMCU. To do this,

1.  Build the firmware. You can use the [online build service](https://nodemcu-build.com/) for it. Enter your email. Select `mdns` module apart from the already selected modules when creating the build. You'll get an email when the build starts and when it's ready to download.
2.  Once you've downloaded the firmware, flash it using `esptool.py`. You can install the `esptool.py` using this command: `pip install --user esptool`
3.  Now connect your NodeMCU to the computer via the USB cable. Check that your NodeMCU can talk with your computer using this command: `esptool.py  --port /dev/cu.usbserial-xxxx flash_id`, where `xxxx` is a number specific to the board and system.
4.  To flash the NodeMCU board, type in this command: `esptool.py --port /dev/cu.usbserial-xxxx write_flash 0x0000 path/to/the/firmware.bin`, replacing the port and the path to the firmware file.
5.  To find out the port, type this command: `ls /dev/cu.usbserial*`

### Installing the program

1.  Clone the repo with the code: `git clone https://github.com/coditva/switchboard`
2.  `cd` to the directory and update the `.nodemcutool` with the port that you found out.
3.  Check that `nodemcutool` works with the board using this configuration: `nodemcu-tool devices`
4.  Now let's upload the code files. To do this type in this command: `nodemcu-tool upload *.lua`.
5.  Now reset the NodeMCU by either pressing the "RST" button or by typing in this command: `nodemcu-tool reset`.