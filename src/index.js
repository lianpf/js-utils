/**
 * @author lianpf
 * @date 2020-11-09
 */

 /**
 * @language: json
 * @desc: JSON 数据格式转化为富文本字符串
 * @param {
  *    jsonData: {}, // 需要转化的 JSON schema 配置
  *    textIndent: '\t', // 缩进占位符
  *    tags: ['controls', 'options', 'children', 'other'] // 拥有‘后代’的key
  * }
  */
 let jsonToRichTextString = ({ jsonData = {}, textIndent = '\t', tags = ['controls', 'options', 'children', 'other'] }) => {
   let keys = Object.keys(jsonData)
   if (keys.length === 0) return false
   let richTextJsonArr = []
   richTextJsonArr = deepData(jsonData, textIndent, tags)
   richTextJsonArr.unshift('{')
   richTextJsonArr.push('}')
   console.log('richTextJsonArr:', richTextJsonArr)
   return richTextJsonArr.join('\n')
 }
 // 递归核心 textIndent 作为入参 deep，随着层级深入累加
 const deepData = (data, textIndent, tags, richTextJsonArr = []) => {
   let bodyIndent = `${textIndent}\t`
   let nextGradeIndent = `${bodyIndent}\t`
   for (let key in data) {
     let _bool = Object.keys(data).indexOf(key) !== Object.keys(data).length - 1
     let _closeIcon = _bool ? ',' : ''
     if (!tags.includes(key)) {
       richTextJsonArr.push(`${textIndent}"${key}": "${data[key]}"${_closeIcon}`)
     } else if (tags.includes(key) && typeof data[key] === "object") {
       if (Array.isArray(data[key])) { // json 数组
         if (data[key].length === 0) {
           richTextJsonArr.push(`${textIndent}"${key}": []${_closeIcon}`)
           return
         }
         richTextJsonArr.push(`${textIndent}"${key}": [`)
         data[key].forEach((item, index) => {
           richTextJsonArr.push(`${bodyIndent}{`)
           richTextJsonArr.concat(deepData(item, `${nextGradeIndent}`, tags, richTextJsonArr))
           richTextJsonArr.push(`${bodyIndent}}${data[key].length-1 !== index ? ',' : ''}`)
         })
         richTextJsonArr.push(`${textIndent}]\n`)
       } else if (Object.keys(data[key]).length > 0) { // object
         richTextJsonArr.push(`${textIndent}"${key}": {`)
         richTextJsonArr.concat(deepData(data[key], `${bodyIndent}`, tags, richTextJsonArr))
         richTextJsonArr.push(`${textIndent}}${_closeIcon}`)
       } else { // 空 object
         richTextJsonArr.push(`${textIndent}"${key}": {}${_closeIcon}`)
       }
     } 
   }
   return richTextJsonArr
 }
 
 /**
  * @language: json
  * @desc: 富文本字符串转化为 JSON 数据格式
  * @param {
  *    richTextJson: '', // 需要转化的 JSON 富文本字符串
  *    textIndent : '\t' // 缩进占位符
  * }
  */
 let richTextStringToJson = ({ richTextJson = '', textIndent = '\t' }) => {
   if (richTextJson.length === 0) return false
   // let reg = /(\t|\n)/g
   let reg = new RegExp(`\(${textIndent}|\n\)`, 'g')
   let jsonStr = richTextJson.replace(reg, '')
   return JSON.parse(jsonStr)
 }
 
 export { jsonToRichTextString, richTextStringToJson };
 