
for (let a of ['a', 'b', 'c']) {
    const str = `export let ${a} = '${a}'`;
    console.log(str);
	eval(str);
}