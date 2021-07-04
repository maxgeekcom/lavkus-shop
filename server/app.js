const express = require('express');
const config = require('config');
const path = require('path');

const PORT = config.get('port') || 5000;
const app = express();


const dirname = '/home/maxim/Yandex.Disk/Projects/lavkus-shop';

app.use(express.json({extended: true}));
app.use('/api', require('./routes/auth.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/edit', require('./routes/edit.routes'));
app.use('/api/pay', require('./routes/pay.routes'));
app.use('/api/recognition', require('./routes/recognition.routes'));
app.use('/api/product', require('./routes/product.routes'))

// console.log(__dirname)
// app.use('/', express.static(path.join(dirname, 'client-app', 'build')))
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(dirname, 'client-app', 'build', 'index.html'))
// })

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
})
