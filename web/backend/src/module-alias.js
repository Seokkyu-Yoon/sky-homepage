import path from 'path'
import moduleAlias from 'module-alias'
moduleAlias.addAlias('@', path.join(__dirname))
moduleAlias.addAlias('@storage', path.join(__dirname, '..', '..', 'storage'))
moduleAlias()
