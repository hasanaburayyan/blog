---
title: Provision a new Windows PC easily
description: Windows Automation with Chocolately 
slug: Windows
authors: [neil]
---

## What is Chocolately?

Chocolately is a Windows package manager similar to `apt` or `yum` if your from the Linux world or `brew` if your in the MacOS world.

## Why would I want to use Chocolately?

Im sure at one point, we have all gotten a new PC and had to take a few hours installing all of our needed software. But who wants to do all that work? Its a lot of time wasted when that work could be automated. Coming from the Linux world, I would typically install most of my applications via apt or dpkg. Installing applications via the command line is way quicker than installing via user interfaces. Thus using a tool like chocolately could be extremely helpful and save you a ton of time!

## Chocolately Installation

Open up a new Powershell terminal with Administrator permissions and run the following command:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

This will install the Chocolately package manager.

## Installing Software

Anytime I get a new laptop or wipe my hard drive and install Windows from scratch, I can run the following command to install all my needed software:

```powershell
choco install git.install autohotkey.portable vscode slack curl evernote discord.install bitwarden firacode -y
```

After running this, you should see all your beloved packages installed on your machine. I used to spend a few hours installing all my applications, now chocolately is my goto!

For a list of all available packages, take a look at https://community.chocolatey.org/packages

## Thoughts?

Ill say for the trash talk Windows gets, its getting better all the time! With the inclusions of tools like Windows Subsystem for Linux (WSL), Windows Subsystem for Andoid (WSA), Chocolately, etc, Windows is getting up there as an operating system to develop on and use as a daily driver for all things!
