const prudens = require("./prudens");
const parsers = require("./parsers");
const fs = require('fs');

function main() {
    const policy_file = '/home/yiannis/cyens/txt/policy.txt';    
    const context = process.argv.slice(2); //get the context from the command
    const policy = fs.readFileSync(policy_file, "utf8");
    const kbObject = parsers.parseKB(policy); 
    const contextObject = parsers.parseContext(context[0])["context"]; 
    const output = prudens.forwardChaining(kbObject, contextObject); //parsing and output
    console.log(JSON.stringify(output));    
}
main();
