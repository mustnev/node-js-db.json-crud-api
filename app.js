const express = require('express')
const fs = require('fs')
const db = require('./data.json')
const app = express()
const PORT = 3000

app.get('/api/v1/data',(req,res)=>{ // tüm dataları çekme
	res.status(200).send(db)
})
app.get('/api/v1/data/:id',(req,res)=>{ // id no ile tekil veri getirme
	if(isNaN(req.params.id)){
		throw res.status(400).send({
			message : 'veri işlenemedi...'
		})
	}else{
		const data = db.find(d=>d.id ==req.params.id)
		if(data){
			res.status(200).send(data)
		}else{
			res.status(404).send({
				message : 'veri bulunamadı...'
			})
		}
	}
})
app.post('/api/v1/data',(req,res)=>{ // veri kaydetme
	const saveData = {
		"userId": req.body.userId,
		"id": req.body.id,
		"title": req.body.title,
		"body": req.body.body
	}
	db.push(saveData)
	res.send(saveData)
})
app.patch('/api/v1/data/:id',(req,res)=>{ // update
	if(isNaN(req.params.id)){
		throw res.status(400).send({
			message : 'veri işlenemedi...'
		})
	}else{
		const data = db.find(d=>d.id ==req.params.id)
		if(data){
			Object.keys(req.body).forEach(key =>{
				data[key] = req.body[key]
			})
			res.status(200).send(data)
		}else{
			res.status(404).send({
				message : 'veri bulunamadı...'
			})
		}	
	}
})
app.delete('/api/v1/data/:id',(req,res)=>{ // delete
	if(isNaN(req.params.id)){
		throw res.status(400).send({
			message : 'veri işlenemedi...'
		})
	}else{
		const dataIndex = db.findIndex(d=>d.id ==req.params.id)
		if(data > -1){
			db.splice(dataIndex,1)
			res.status(201).send({
				message : 'kullanıcı silindi...'
			})
		}else{
			res.status(404).send({
				message : 'veri bulunamadı...'
			})
		}
	}
})
app.listen(PORT, () =>{
	console.log('sunucu çalışıyor localhost:'+PORT)
})