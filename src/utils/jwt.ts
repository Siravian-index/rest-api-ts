import config from 'config'

const publicKey = config.get<string>("publicKey")
const privateKey = config.get<string>("privateKey")

async function signJwt() {

}


async function verifyJwt() {

}


export {
    signJwt,
    verifyJwt,
}