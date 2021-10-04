async function* readFiles(files){
  for (const file of files){
    yield await readFile(file)
  }
}
