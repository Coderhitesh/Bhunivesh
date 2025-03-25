const express = require('express');
const router = express.Router();
const upload = require('../Middleware/Multer')
const { createLocation, findAllLocations, updateLocation, findOneLocation, deleteLocation } = require('../controllers/location.controller');
const { createPropertyType, findAllPropertyTypes, findOnePropertyType, updatePropertyType, deletePropertyType } = require('../controllers/propertyType.controller');
const { createHero, findAllHeros, findOneHero, updateHero, deleteHero, updateHeroStatus } = require('../controllers/hero.controller');
const { createProperty, findAllProperties, findPropertyBySlug, findOneProperty, findPropertyByLocationAndPropertyType, updateProperty, deleteProperty } = require('../controllers/property.controller');
const { createInquery, findAllInquerys } = require('../controllers/inquery.controller');
const { getAllBlog, getSingleBlog, deleteBlog, updateBlog, createBlog, getBlogBySlug } = require('../controllers/blog.controller');
const { createPropertyInquery, findAllPropertyInquirys, deletePropertyInquiry } = require('../controllers/propertyInquery.controller');

// Create a new location
router.post('/create_location', createLocation);
router.get('/get_locations', findAllLocations);
router.get('/get_location/:id', findOneLocation);
router.put('/update_location/:id', updateLocation);
router.delete('/delete_location/:id', deleteLocation);

// propertytype routes here 
router.post('/create_propertyType', createPropertyType);
router.get('/get_propertyTypes', findAllPropertyTypes);
router.get('/get_propertyType/:id', findOnePropertyType);
router.put('/update_propertyType/:id', updatePropertyType);
router.delete('/delete_propertyType/:id', deletePropertyType);

// hero route from here 
router.post('/create_hero', upload.single('image'), createHero);
router.get('/get_heroes', findAllHeros);
router.get('/get_hero/:id', findOneHero);
router.put('/update_hero/:id', upload.single('image'), updateHero);
router.delete('/delete_hero/:id', deleteHero);

// property routes here 
router.post('/create_property', upload.single('image'), createProperty);
router.get('/get_properties', findAllProperties);
router.get('/get_property/:id', findOneProperty);
router.get('/get_property_by_location', findPropertyByLocationAndPropertyType);
router.get('/get_property_slug/:slug', findPropertyBySlug);
router.put('/update_property/:id', upload.single('image'), updateProperty);
router.put('/update_hero_status/:id', updateHeroStatus);
router.delete('/delete_property/:id', deleteProperty);

// inquery routes here
router.post('/create_inquery', createInquery);
router.get('/get_inqueries', findAllInquerys);

// blog routes here 
router.post('/create_blog', upload.fields([{name: 'image', maxCount: 1}, {name: 'largeImage', maxCount: 1}]), createBlog);
router.get('/get_blogs', getAllBlog);
router.get('/get_blog/:id', getSingleBlog);
router.put('/update_blog/:id', upload.fields([{name: 'image', maxCount: 1}, {name: 'largeImage', maxCount: 1}]), updateBlog);
router.delete('/delete_blog/:id', deleteBlog);
router.get('/get_blog_by_slug/:slug', getBlogBySlug);

// property inquiry route here 
router.post('/create_property_inquery',createPropertyInquery)
router.get('/get_property_inquery',findAllPropertyInquirys)
router.delete('/delete_property_inquery/:id',deletePropertyInquiry)

module.exports = router;