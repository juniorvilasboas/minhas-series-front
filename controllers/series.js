const labels = [
  { id: 'to-watch', name: 'Para Assistir', desc: 'bg-success' },
  { id: 'watching', name: 'Assistindo', desc: 'bg-warning text-dark' },
  { id: 'watched', name: 'Assistido', desc: 'bg-danger' }
]

const index = ({ Serie }, req, res) => {
  Serie.find({}, (err, docs) => {
    res.render('series/index', { series: docs, labels })
  })
}

const novaProcess = ({ Serie }, req, res) => {
  const serie = new Serie(req.body)
  serie.save(() => {
    res.redirect('/series')
  })
}

const novaForm = (req, res) => {
  res.render('series/nova')
}

const editarProcess = ({ Serie }, req, res) => {
  Serie.findOne({ _id: req.params.id }, (err, serie) => {
    serie.name = req.body.name
    serie.status = req.body.status
    serie.save()
    res.redirect('/series')
  })
}

const editarForm = ({ Serie }, req, res) => {
  Serie.findOne({ _id: req.params.id }, (err, serie) => {
    res.render('series/editar', { serie, labels })
  })
}

const excluir = ({ Serie }, req, res) => {
  Serie.deleteOne({
    _id: req.params.id
  }, (err) => {
    res.redirect('/series')
  })
}

module.exports = {
  index,
  novaProcess,
  novaForm,
  editarProcess,
  editarForm,
  excluir
}