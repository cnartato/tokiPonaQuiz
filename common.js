
export async function getToki()
{
    let result = await fetch('pu.csv').then(res=>res.text())
    let lines = result.split('\n')

    let output = []

    for (let i = 1; i < lines.length; i++) {
        let line = lines[i]
        // let type = line.match(/[A-Z]{1,}/g)
        // console.log(type, line)
        let cells = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/g)

        let fixedCells = []
        cells.forEach(cell=>{
            fixedCells.push(cell.replaceAll('"', ''))
        })

        output.push(fixedCells)
    }

    return output
}