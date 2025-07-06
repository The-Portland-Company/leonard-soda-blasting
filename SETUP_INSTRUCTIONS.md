# Directus Pages Collection Setup Instructions

## Problem
The Directus Pages Collection does not list pages and needs to be properly configured with all frontend pages.

## Solution Steps

### 1. Stop any running Directus processes
```bash
pkill -f "directus start"
```

### 2. Navigate to project root
```bash
cd /Users/spencerhill/Sites/leonard-soda-blasting
```

### 3. Reset the database (removes corrupted tables)
```bash
node simple-reset.js
```

### 4. Bootstrap fresh Directus installation
```bash
cd backend
npm run bootstrap
```

### 5. Start Directus server
```bash
npm start
```

### 6. Access admin interface
- Go to: http://localhost:8055/admin
- Login with:
  - Email: `agency@theportlandcompany.com`
  - Password: `J9u76asecdst!`

### 7. Create Pages Collection Manually

**In the Directus admin interface:**

1. Go to "Settings" > "Data Model"
2. Click "Create Collection"
3. Name: `pages`
4. Icon: `article`
5. Note: `Website pages content`
6. Display Template: `{{title}}`
7. Click "Save"

**Add these fields to the Pages collection:**

| Field Name | Type | Interface | Options |
|------------|------|-----------|---------|
| `title` | String | Input | Required, Width: Full |
| `slug` | String | Input | Required, Width: Half, Note: "URL slug" |
| `page_type` | String | Select Dropdown | Choices: Home, About, Services, Gallery, Contact |
| `status` | String | Select Dropdown | Choices: Published, Draft |
| `sort` | Integer | Input | Hidden |
| `hero_title` | String | Input | Width: Full |
| `hero_subtitle` | Text | Textarea | Width: Full |
| `hero_image` | File | File (Image) | Width: Half |
| `content` | Text | Rich Text Editor | Width: Full |
| `gallery_images` | JSON | List | Width: Full |
| `meta_title` | String | Input | Width: Half |
| `meta_description` | Text | Textarea | Width: Half |

### 8. Add Sample Pages

**Create these pages in the admin interface:**

1. **Home Page**
   - Title: `Home`
   - Slug: `/`
   - Page Type: `home`
   - Status: `published`
   - Hero Title: `Leonard Soda Blasting`
   - Hero Subtitle: `Professional Soda Blasting Services`

2. **About Page**
   - Title: `About Soda Blasting`
   - Slug: `/about-soda-blasting`
   - Page Type: `about`
   - Status: `published`
   - Hero Title: `About Soda Blasting`
   - Hero Subtitle: `Safe and effective cleaning method`

3. **Services Page**
   - Title: `Our Services`
   - Slug: `/services`
   - Page Type: `services`
   - Status: `published`
   - Hero Title: `Our Services`
   - Hero Subtitle: `Comprehensive soda blasting solutions`

### 9. Verification Steps

**Verify Pages Collection Works:**
1. In Directus admin, go to "Content" > "Pages"
2. Confirm you can see the 3 pages listed
3. Click on a page to edit it
4. Make a small change and save

**Verify API Access:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8055/items/pages
```

**Verify Frontend Integration:**
```bash
cd frontend
npm start
```
- Check browser console for Directus API errors
- Verify pages load without errors

## Expected Result

After completing these steps:
- ✅ Directus admin shows Pages collection with pages listed
- ✅ Pages are editable through admin interface
- ✅ Frontend can fetch page data from Directus API
- ✅ All frontend text and photos are manageable from Directus

## Files Created/Modified

- `backend/.env` - Added proper SSL configuration
- `simple-reset.js` - Database reset script
- This setup guide

## Troubleshooting

If bootstrap fails, check:
- Node.js version (requires 22+)
- Database connection in `.env`
- Supabase database is accessible

If admin login fails:
- Run: `node scripts/create-new-admin.js`
- Try the bootstrap process again