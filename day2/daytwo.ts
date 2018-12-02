import * as file from 'fs';

class Solver {
    private counts;
    private filename: string;

    constructor(filename:string){
        this.filename = filename;
    }

    solve(prob: string){
        this.counts = {twos:0, threes:0};
        switch(prob){
            case 'a':
                this.solveA(this.filename);
                return;
            case 'b':
                this.solveB(this.filename);
                return;
            default:
                console.log('No such problem');
                return;
        }
    }

    solveA(filepath: string){
        file.readFile(filepath, 'utf-8', (err, data) => {
            if(err){
                console.log(err);
                return;
            } else {
                let lines = data.split(/\n/);
                for(let line of lines) {
                    let found = {two:false, three:false};
                    while(line !== ''){
                        let count = this.countChar(line.charAt(0), line);
                        if(count === 2) {found.two = true};
                        if (count === 3) {found.three = true};
                        line = line.split(line.charAt(0)).join('');
                    }
                    if(found.two){this.counts.twos++};
                    if(found.three){this.counts.threes++};
                }
                console.log('twos: '+this.counts.twos+' threes: '+this.counts.threes);
                console.log('Checksum will be: '+(this.counts.twos*this.counts.threes));
            }
        });
    }

    solveB(filepath: string){
        file.readFile(filepath, 'utf-8', (err, data) => {
            if(err){
                console.log(err);
            } else {
                let lines = data.split(/\n/);
                lines.forEach((item, index) => {
                    for(let line of lines){
                        let count = 0;
                        let pos;
                        for(let i = 0; i < line.length; i++){
                            if(item.charAt(i) !== line.charAt(i)){
                                count++;
                                pos = i;
                            }
                        }
                        if(count === 1){
                            let ans = line.substring(0, pos) + line.substring(pos+1);
                            console.log(ans);
                            return;
                        }
                    }
                });
            }
        });
    }

    countChar(compchar: string, line: string){
        let count: number = 0;
        let lineArr = line.split('');
        for(let char of lineArr){
            if(char === compchar) {
                count++;
            }
        }
        return count;
    }
}

let solution = new Solver('./input.txt');
solution.solve('b');