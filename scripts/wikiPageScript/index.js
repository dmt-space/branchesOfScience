const fetch = require('node-fetch')
const fs = require('fs')
const resolve = require('path').resolve
const LineReader = require('linereader')

function extractValueByKeyandEnd({ line, startString, stopString }) {
  const nameIndex = line.indexOf(startString)
  const startStringLength = startString.length
  if (line.indexOf(startString) > -1) {
    // look for entity name
    const endIndex = line.substr(nameIndex + startStringLength).indexOf(stopString)
    return line.substr(nameIndex + startStringLength, (endIndex === -1) ? 10000 : endIndex)
  }
  return false
}

const lineReader = new LineReader('../../data/toTransform')
const fileName = ''
    let patternLevels = [['==', 'Branches of Science']]
    let currParent = 'Branches of Science'
    let prevPattern = ''
    let prev = ''

    lineReader.on('line', function (lineno, line) {
        if (!line) return
        let currWiki, currDesc, nowParent
        const catPattern = line.substr(0, line.indexOf(" "))
        if (catPattern === '==' || catPattern === '===') {
            if (catPattern === '===' && patternLevels.find(el => el[0] === '===')) {
                patternLevels = [['==', 'Branches of Science'],['===', patternLevels.find(el => el[0] === '===')[1]]]
            } else {
                patternLevels = [['==', 'Branches of Science']]
                if (catPattern === '==') currParent = 'Branches of Science'
            }
        }


        if (patternLevels.map(el => el[0]).indexOf(catPattern) === -1 || (patternLevels.map(el => el[0]).indexOf(catPattern) === (patternLevels.map(el => el[0]).indexOf(prevPattern) +1))) {
            // new pattern!
            // new deeper level! -> save pattern set currParent with -1 index

            if (catPattern.indexOf('==') > -1) {
                currWiki = line.substring(catPattern.length + 1, (line.length - catPattern.length -1))
                currDesc = currWiki
            }
            else {
                const potentialWiki = extractValueByKeyandEnd({line, startString: '[[', stopString: ']]' })
                if (potentialWiki) {
                    const [ s1, s2 ] = potentialWiki.split('|')
                    // console.debug(potentialWiki,s1)
                    currWiki = s1
                    currDesc = s2 || s1
                }
            }


            if (patternLevels.map(el => el[0]).indexOf(catPattern) !== -1 && (patternLevels.map(el => el[0]).indexOf(catPattern) === (patternLevels.map(el => el[0]).indexOf(prevPattern) +1))) {
                if (catPattern !== '==') patternLevels[patternLevels.map(el => el[0]).indexOf(catPattern)] = [catPattern,prev]
                // else console.debug(0,catPattern, patternLevels)
                if (patternLevels.length > 1 && (!nowParent)) nowParent =  prev
            }
            else {
                if (catPattern !== '==') patternLevels.push([catPattern,prev])
                // else console.debug(1,catPattern, line)
                if (catPattern !== '==' && patternLevels.length > 1 && (!nowParent)) nowParent =  prev
            }

        }
        else {
            // known level!
            currParent = patternLevels.find(el => el[0] === catPattern)[1]

            if (catPattern.indexOf('==') > -1) {
                currWiki = line.substring(catPattern.length + 1, (line.length - catPattern.length -1))
                currDesc = currWiki
            }
            else {
                const potentialWiki = extractValueByKeyandEnd({line, startString: '[[', stopString: ']]' })
                if (potentialWiki) {
                    const [ s1, s2 ] = potentialWiki.split('|')
                    // console.debug(potentialWiki,s1)
                    currWiki = s1
                    currDesc = s2 || s1
                }
            }

        }
        prev = currDesc || currWiki
        prevPattern = catPattern
        console.debug(currWiki+','+currDesc+','+(nowParent || currParent))
    });