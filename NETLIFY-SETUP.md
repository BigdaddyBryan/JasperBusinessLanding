# Missie Weerbaarheid - Landing Page

## 🚀 NETLIFY FORM SETUP - SNELLE START GIDS

### ⚡ In 5 minuten werkend formulier!

---

## STAP 1: Deploy naar Netlify

### Via GitHub (Aanbevolen)

```bash
# 1. Push naar GitHub
git add .
git commit -m "Add contact form"
git push origin main

# 2. Ga naar app.netlify.com
# 3. Klik "Add new site" > "Import from Git"
# 4. Selecteer je repo
# 5. Settings:
#    - Build command: (leeg)
#    - Publish directory: .
# 6. Deploy!
```

---

## STAP 2: Email Notificaties (BELANGRIJK!)

**Netlify Dashboard → Forms → contact-form → Notifications**

1. Klik "Add notification"
2. Kies "Email notification"
3. Email: `info@missieweerbaarheid.nl`
4. Subject: `Nieuw bericht van {{name}} ({{email}})`
5. Save

**✅ Zonder dit krijg je GEEN emails!**

---

## STAP 3: Test het Formulier

### Test Checklist:

1. ✅ Ga naar je live site
2. ✅ Vul contact form in
3. ✅ Klik "Verstuur"
4. ✅ Wordt je naar bedankt.html gestuurd?
5. ✅ Check Netlify Dashboard > Forms > Submissions
6. ✅ Check je email inbox (ook spam!)

---

## 🐛 TROUBLESHOOTING

### ❌ Form niet in Dashboard?

**Oplossing:**

```bash
# Force rebuild
git commit --allow-empty -m "Rebuild"
git push
```

Check in `index.html`:

- `data-netlify="true"` aanwezig?
- `name="contact-form"` aanwezig?
- `action="/bedankt.html"` aanwezig?

### ❌ Form wordt niet verstuurd?

1. Open Browser Console (F12)
2. Check for errors
3. Alle velden ingevuld?
4. Checkbox aangevinkt?

### ❌ Geen emails?

1. **Check Netlify Dashboard > Forms > Notifications**
2. Is notificatie "enabled"?
3. Email correct gespeld?
4. **Check SPAM folder!**
5. Test notificatie in Dashboard

---

## 📊 Form Configuratie

### HTML Form Setup (✅ Al correct)

```html
<form
  name="contact-form"
  method="POST"
  action="/bedankt.html"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
>
  <!-- Hidden fields -->
  <input type="hidden" name="form-name" value="contact-form" />
  <p hidden><input name="bot-field" /></p>

  <!-- Jouw form velden hier -->
</form>
```

### Form Fields:

| Veld     | Name         | Type     | Required |
| -------- | ------------ | -------- | -------- |
| Naam     | `name`       | text     | ✓        |
| Email    | `email`      | email    | ✓        |
| Bericht  | `message`    | textarea | ✓        |
| Voorkeur | `preference` | select   | ✓        |
| Consent  | `consent`    | checkbox | ✓        |

---

## 🎯 TEST FILES

### Lokaal Testen (voor deployment)

Open in browser:

- `form-test.html` - Test formulier validatie
- `bedankt.html` - Preview bedank pagina

---

## 🔥 WAAROM HET NU WERKT

1. ✅ `data-netlify="true"` - Activeert Netlify Forms
2. ✅ `name="contact-form"` - Form identifier
3. ✅ `action="/bedankt.html"` - Redirect na submit
4. ✅ Hidden `form-name` field - Required door Netlify
5. ✅ `bot-field` honeypot - Spam protection
6. ✅ Geen JavaScript interference - Pure Netlify handling

---

## 📧 Email Notificatie Setup

**Netlify Dashboard > Forms > contact-form > Notifications > Add**

**Email Template Voorbeeld:**

```
To: info@missieweerbaarheid.nl
Subject: Nieuw contact: {{name}} wil {{preference}}

Naam: {{name}}
Email: {{email}}
Voorkeur: {{preference}}

Bericht:
{{message}}

---
Verzonden via Missie Weerbaarheid website
```

---

## ✨ EXTRA FEATURES

### Spam Protection

Netlify Dashboard > Forms > Settings:

- ✅ Enable "Spam filtering"
- Optional: Enable reCAPTCHA v2

### Multiple Email Notificaties

Voeg toe voor verschillende mensen:

- Robert: robert@missieweerbaarheid.nl
- Jasper: jasper@missieweerbaarheid.nl
- Backup: info@missieweerbaarheid.nl

### Slack Notificaties (Optional)

Forms > Notifications > Add > Slack

---

## 🎉 KLAAR!

Na deze stappen zou je:

1. ✅ Submissions zien in Netlify Dashboard
2. ✅ Emails ontvangen bij elke submission
3. ✅ Bezoekers naar bedankt.html redirecten

**Werkt het niet?** Check troubleshooting hierboven!

---

## 📱 Contact

**Email**: info@missieweerbaarheid.nl  
**Robert**: 06 14 56 21 49  
**Jasper**: 06 24 55 65 21

**Site**: https://missieweerbaarheid.nl  
**Netlify**: https://[jouw-site].netlify.app

---

## 📚 Resources

- [Netlify Forms Docs](https://docs.netlify.com/forms/setup/)
- [Form Notifications](https://docs.netlify.com/forms/notifications/)
- [Spam Filtering](https://docs.netlify.com/forms/spam-filters/)

---

**Version**: 2.0 (Pure Netlify Forms)  
**Last Updated**: October 2025
