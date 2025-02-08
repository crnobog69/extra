<div align="center">

---

[Српски (🇷🇸)](README.md) | [English (🇬🇧)](README-en.md)

---

</div>


# Setup

> [!CAUTION]
> LOCAL `IP` ADDRESS!

---

#### **1. Check Network Service**  

```bash
systemctl list-units --type=service | grep -E 'NetworkManager|systemd-networkd|dhcpcd'
```

---

#### **2. NetworkManager**  

```bash
nmcli connection modify "Connection-Name" ipv4.addresses 192.168.1.100/24 ipv4.gateway 192.168.1.1 ipv4.dns "8.8.8.8,1.1.1.1" ipv4.method manual  
nmcli connection up "Connection-Name"  
```

---

#### **3. systemd-networkd**  

1. Create the file `/etc/systemd/network/20-wired.network`:  

```ini
[Match]  
Name=enp3s0  

[Network]  
Address=192.168.1.100/24  
Gateway=192.168.1.1  
DNS=8.8.8.8 1.1.1.1  
```

2. Restart:  

```bash
sudo systemctl restart systemd-networkd  
```

---

#### **4. dhcpcd**  

1. Edit `/etc/dhcpcd.conf`:  

```bash
interface enp3s0  
static ip_address=192.168.1.100/24  
static routers=192.168.1.1  
static domain_name_servers=8.8.8.8 1.1.1.1  
```

2. Restart:  

```bash
sudo systemctl restart dhcpcd  
```

> [!NOTE]
> Replace `enp3s0` and `192.168.1.x` with your values.

---

# Reverting

To revert back to dynamic IP assignment (DHCP) after setting a static configuration, you need to modify the configuration for the service you're using. Below are the steps for each of the methods mentioned:

---

#### **1. NetworkManager**

If you used `NetworkManager` to set a static IP address, revert to DHCP using the following command:

```bash
nmcli connection modify "Connection-Name" ipv4.method auto
nmcli connection up "Connection-Name"
```

This changes the method for acquiring the IP address to automatic (`DHCP`) for the specified connection profile.

---

#### **2. systemd-networkd**

If you created the file `/etc/systemd/network/20-wired.network` for the static configuration, perform the following changes:

1. Open the file `/etc/systemd/network/20-wired.network` in your editor (e.g., `nano` or `vim`):

   - Remove or comment out the lines defining static values (e.g., `Address=`, `Gateway=`, `DNS=`) and add a line to enable DHCP:
   
   ```ini
   [Match]
   Name=enp3s0

   [Network]
   DHCP=yes
   ```

2. Then restart the service:

   ```bash
   sudo systemctl restart systemd-networkd
   ```

This will configure the interface to use DHCP.

---

#### **3. dhcpcd**

If you used `dhcpcd` for static configuration, follow these steps:

1. Open the file `/etc/dhcpcd.conf` in your editor and locate the section for the specific interface (e.g., `enp3s0`). Comment out or remove the lines that set static values:

   ```bash
   #interface enp3s0
   #static ip_address=192.168.1.100/24
   #static routers=192.168.1.1
   #static domain_name_servers=8.8.8.8 1.1.1.1
   ```

2. Then restart the `dhcpcd` service:

   ```bash
   sudo systemctl restart dhcpcd
   ```

This will revert the interface to dynamically obtaining the IP address via DHCP.

---

> [!NOTE]
> - Replace `enp3s0` with the actual name of your network interface.  
> - For NetworkManager, replace `"Connection-Name"` with the name of your connection profile.
>
> After these changes, the system will use DHCP to automatically obtain an IP address.