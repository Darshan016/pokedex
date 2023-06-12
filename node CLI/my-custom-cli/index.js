#!/usr/bin/env node

const inquire=require('inquirer')
// const yargs=require('yargs')
// const {argv} = yargs(process.argv)

const printMoves=async (name)=>{
    try{

        const { default: fetch } = await import('node-fetch');
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if(response.status===200){
            const pokemon = await response.json()
            const moves=pokemon.moves.map(({move})=>move.name)
            console.log(moves.slice(0,5))
            
        }else{
            console.log(`${name} is invalid name or it doesn't exist`)
        }
    }catch(error){
        console.error(`Error:${error.message}`)
    }

}
const prompt=inquire.createPromptModule()
prompt([{
    type:"input",
    name:"pokemon",
    message:"enter the pokemon name to see its 5 moves"
}]).then((ansmwer)=>{
    const pokemon=ansmwer.pokemon
    printMoves(pokemon)
})