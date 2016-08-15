const gulp = require('gulp')
const ftp = require('vinyl-ftp')
const minimist = require('minimist')
const util = require('gulp-util')

const args = minimist(process.argv.slice(2))

gulp.task('deploy', () => {
  const remotePath = '/public_html/nielsgerritsen/cloudboard'
  const conn = ftp.create({
    host: 'carehr.nl',
    user: args.user,
    pass: args.password,
    log: util.log
  })

  return gulp.src(['./public/**', './sounds/**/*.mp3', './index.html'])
    .pipe(conn.newer(remotePath))
    .pipe(conn.dest(remotePath))
})
