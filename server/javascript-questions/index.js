// https://github.com/lydiahallie/javascript-questions

const fs = require("fs");

class Subject {
  constructor() {
    this.title = "";
    this.codeStr = "";
    this.codeLanguage = "";
    this.codeMarkdown = "";
    this.options = [];
    this.answers = [];
    this.explain = "";
  }
}

const content = fs.readFileSync("EADME-zh_CN.md").toString();
const reg = /######([\s\S]*?)######/g;
let result;
const subjectList = [];
const markdownArr = [];
while ((result = reg.exec(content)) !== null) {
  const subjectStr = result[1].replace(/---[\s\S]*?$/, "").trim();
  try {
    markdownArr.push("###### " + subjectStr);
    subjectList.push(processSubject(subjectStr));
    reg.lastIndex -= 6;
  } catch (error) {
    console.log("error", subjectStr, error);
  }
}
fs.writeFileSync("subjects.json", JSON.stringify(subjectList));
fs.writeFileSync("markdownArr.json", JSON.stringify(markdownArr));

function processSubject(subjectStr) {
  const subject = new Subject();
  const titleReg = /(.*)/;
  subject.title = titleReg.exec(subjectStr)[1].trim();
  const codeReg = /```(\w*)([\s\S]*?)```/;
  const codeRegResult = codeReg.exec(subjectStr);
  subject.codeMarkdown = codeRegResult?.[0].trim();
  subject.codeLanguage = codeRegResult?.[1].trim();
  subject.codeStr = codeRegResult?.[2].trim();
  const optionsReg = /-\s(.*)/g;
  let option;
  while ((option = optionsReg.exec(subjectStr)) !== null) {
    subject.options.push(option[1].trim());
  }
  const answerAndExplainReg = /<p>([\s\S]*?)<\/p>/;
  const answerAndExplain = answerAndExplainReg.exec(subjectStr)[1].trim();
  const answerReg = /(\w)/g;
  const answer = answerReg.exec(answerAndExplain)[1].trim();
  subject.answers.push(answer);
  subject.explain = answerAndExplain.substring(answerReg.lastIndex).trim();
  return subject;
}
