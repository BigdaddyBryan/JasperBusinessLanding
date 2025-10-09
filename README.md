# Missie Weerbaarheid - Landing Page

## Netlify Form Setup Instructies

### 1. Deploy naar Netlify

1. Push je code naar GitHub
2. Ga naar [Netlify](https://app.netlify.com)
3. Klik op "Add new site" > "Import an existing project"
4. Selecteer je GitHub repository
5. Deploy settings:
   - Build command: (leeg laten)
   - Publish directory: `.`
6. Klik op "Deploy site"

### 2. Form Notifications Instellen

Na deployment:

1. Ga naar je site in Netlify Dashboard
2. Klik op "Forms" in het menu
3. Je zou het "contact-form" moeten zien
4. Klik op "Form notifications"
5. Voeg een "Email notification" toe:
   - Email to notify: `info@missieweerbaarheid.nl` (of jouw gewenste email)
   - Subject: `Nieuw contactformulier bericht van {{email}}`

### 3. Test het Formulier

1. Ga naar je live site
2. Vul het contact formulier in
3. Verstuur het formulier
4. Check:
   - Netlify Dashboard > Forms > Submissions
   - Je email inbox voor de notificatie

### 4. Spam Filtering (Optioneel)

Om spam te verminderen:

1. In Netlify Dashboard > Forms
2. Klik op je form
3. Enable "reCAPTCHA" of "Akismet"

## Form Velden

Het contact formulier verzamelt:

- **Naam** (name)
- **E-mail** (email)
- **Bericht** (message)
- **Contact voorkeur** (preference): Telefonisch, Video, of Email
- **Privacy toestemming** (consent)

## Troubleshooting

### Forms verschijnen niet in Netlify Dashboard

- Check of `data-netlify="true"` aanwezig is in het `<form>` tag
- Check of `name="contact-form"` correct is ingesteld
- Herdeployeer de site

### Formulier wordt niet verstuurd

- Open browser console (F12) en check voor errors
- Zorg dat alle required fields ingevuld zijn
- Check of JavaScript correct laadt

### Geen email notificaties

- Controleer spam folder
- Check Netlify Dashboard > Forms > Notifications settings
- Bevestig dat het correcte email adres is ingesteld

## Contact

Voor vragen: info@missieweerbaarheid.nl
