import express from 'express';
import { createHostedZone, createRecordSet, deleteHostedZone, deleteRecordSet, getAllRecordSets, getTotalActiveHostedZones, updateRecordSet } from '../controller/records-controller.js';
import { login, register } from '../controller/auth-controller.js';
import verifyToken from '../middleware/auth-middleware.js';
// import upload from '../utils/upload.js';

const route = express.Router();



route.post('/addrecord' ,verifyToken, createRecordSet);
route.delete('/deleteRecord' ,verifyToken, deleteRecordSet);
route.put('/updateRecordSet' , verifyToken,updateRecordSet);
route.get('/getAllRecordSets' ,verifyToken, getAllRecordSets);
route.post('/register' , register);
route.post('/login' , login);


route.post('/createHostedZone' ,verifyToken, createHostedZone);
route.get('/getHostedZone' ,verifyToken, getTotalActiveHostedZones);
route.post('/deleteHostedZone' , deleteHostedZone);

export default route;