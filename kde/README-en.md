# ⚙️ Configurations | KDE Plasma 6.1

<div align="center">

---

[Српски (🇷🇸)](README.md) | [English (🇬🇧)](README-en.md)

---

</div>

- 🗼 | [`konsole`](konsole/README.md) <= guide | **Tokyo Night** theme
- ⌨️ | [`shortcut-scheme`](shortcut-scheme/README.md) <= guide | my keyboard shortcut configuration
- 🐈 | [`catppuccin/kde`](https://github.com/catppuccin/kde) <= theme for KDE Plasma

The `colors` file is for the `AppleDark-All` theme located at `/home/krematorijum/.local/share/plasma/desktoptheme/AppleDark-ALL/`.

## Other

### No title bar?

In the `kwinrc` file:

```bash
micro ./config/kwinrc
```

Under the **[Windows]** section, set `BorderlessMaximizedWindows` to `false`.

Like this:

```txt
[Windows]
BorderlessMaximizedWindows=false
```

<br>