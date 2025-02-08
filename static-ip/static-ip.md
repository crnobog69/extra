# Постављање

## **Подеси статичку `IP` на Arch Linux-у**

ЛОКАЛНА `IP` АДРЕСА!

---

## **1. Провери мрежни сервис**  

```bash
systemctl list-units --type=service | grep -E 'NetworkManager|systemd-networkd|dhcpcd'
```

---

## **2. NetworkManager**  

```bash
nmcli connection modify "Име-везе" ipv4.addresses 192.168.1.100/24 ipv4.gateway 192.168.1.1 ipv4.dns "8.8.8.8,1.1.1.1" ipv4.method manual  
nmcli connection up "Име-везе"  
```

---

## **3. systemd-networkd**  

1. Направи фајл `/etc/systemd/network/20-wired.network`:  

```ini
[Match]  
Name=enp3s0  

[Network]  
Address=192.168.1.100/24  
Gateway=192.168.1.1  
DNS=8.8.8.8 1.1.1.1  
```

2. Рестартуј:  

```bash
sudo systemctl restart systemd-networkd  
```

---

## **4. dhcpcd**  

1. Уређуј `/etc/dhcpcd.conf`:  

```bash
interface enp3s0  
static ip_address=192.168.1.100/24  
static routers=192.168.1.1  
static domain_name_servers=8.8.8.8 1.1.1.1  
```

2. Рестартуј:  

```bash
sudo systemctl restart dhcpcd  
```

**Напомена:** Замени `enp3s0` и `192.168.1.x` са твојим вредностима.

---

# Уклањање

Да бисте вратили динамичко добијање `IP` адресе (`DHCP`) након што сте поставили статичку конфигурацију, потребно је да измените конфигурацију за сервис који користите. Испод су кораци за сваки од наведених метода:

---

**1. NetworkManager**

Ако сте користили `NetworkManager` да бисте подесили статичку `IP` адресу, вратите подешавање на DHCP командом:

```bash
nmcli connection modify "Име-везе" ipv4.method auto
nmcli connection up "Име-везе"
```

Овим се мења метод за добијање `IP` адресе на аутоматски (`DHCP`) за дати профил везе.

---

**2. systemd-networkd**

Ако сте креирали фајл `/etc/systemd/network/20-wired.network` за статичку конфигурацију, урадићете следеће измене:

1. Отворите фајл `/etc/systemd/network/20-wired.network` у уређивачу (нпр. `nano` или `vim`):

   - Уклоните или коментаришите линије које дефинишу статичке вредности (нпр. `Address=`, `Gateway=`, `DNS=`) и додајте линију која омогућава DHCP:
   
   ```ini
   [Match]
   Name=enp3s0

   [Network]
   DHCP=yes
   ```

2. Затим рестартујте сервис:

   ```bash
   sudo systemctl restart systemd-networkd
   ```

Овим ће се интерфејс конфигурисати да користи DHCP.

---

**3. dhcpcd**

Ако сте користили dhcpcd за статичку конфигурацију, урадите следеће:

1. Отворите фајл `/etc/dhcpcd.conf` у уређивачу и пронађите секцију за одређени интерфејс (нпр. `enp3s0`). Коментаришите или уклоните линије које задају статичке вредности:

   ```bash
   #interface enp3s0
   #static ip_address=192.168.1.100/24
   #static routers=192.168.1.1
   #static domain_name_servers=8.8.8.8 1.1.1.1
   ```

2. Затим рестартујте dhcpcd сервис:

   ```bash
   sudo systemctl restart dhcpcd
   ```

Овим ће се интерфејс вратити на динамичко добијање IP адресе путем DHCP-а.

---

**Напомена:**  
- Замени `enp3s0` са стварним именом твог мрежног интерфејса.  
- За NetworkManager, замени `"Име-везе"` са именом твог профила везе.

Након ових измена, систем ће користити DHCP за аутоматско добијање IP адресе.