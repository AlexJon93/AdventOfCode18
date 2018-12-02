import * as file from 'fs';

enum Operator {Sub, Plus, Empty};
const frequencySet: Set<number> = new Set();

class Solver {
    counter: number;

    constructor() {
        this.counter = 0;
        frequencySet.add(this.counter);
    }

    solveSum(fileloc: string) {
        file.readFile(fileloc, 'utf-8', (err, data) => {
            if(err) {
                console.log('error:' + err);
                return;
            } else {
                let lines: string[] = data.split('\n');
                for(let line of lines) {
                    let parsed = this.parser(line);
                    if(parsed === false) {
                        console.log('error with parsing');
                        return;
                    } else if (parsed === null) {
                        continue;
                    } else {
                        this.sumMachine(parsed.op, parsed.num);
                    }
                }
                console.log(this.counter);
            }
        });
    }

    solveRepeat(fileloc: string){
        file.readFile(fileloc, 'utf-8', (err, data) => {
            if(err) {
                console.log('error:' + err);
                return;
            } else {
                let lines: string[] = data.split('\n');
                while(true) {
                    for(let line of lines) {
                        let parsed = this.parser(line);
                        if(parsed === false) {
                            console.log('error with parsing');
                            return;
                        } else if (parsed === null) {
                            continue;
                        } else {
                            if(this.sumMachine(parsed.op, parsed.num)){
                                console.log(this.counter);
                                return;
                            }
                        }
                    }
                }
            }
        })
    }

    private parser(data: string) {
        let op: Operator;

        if(data === "") {
            return null;
        }

        switch(data.charAt(0)) {
            case '-':
                op = Operator.Sub
                break;
            case '+':
                op = Operator.Plus
                break;
            default:
                return false;
        }

        let num: number = +data.slice(1);
        return {op: op, num: num};
    }

    private sumMachine(op: Operator, value: number): boolean {
        switch(op) {
            case Operator.Sub:
                this.counter -= value;
                break;
            case Operator.Plus:
                this.counter += value;
                break;
            case Operator.Empty:
                return false;
            default:
                return false;
        }

        if(frequencySet.has(this.counter)){
            return true;
        } else{
            frequencySet.add(this.counter);
            return false;
        }
    }
}

let main = new Solver();
main.solveRepeat('./input.txt');