import {app} from "./src/app";

app()
    .then((server) => {
        server.listen(process.env.APP_PORT, ()=> {
            console.log(`Application Started on port ${process.env.APP_PORT}`)
        });
    })
    .catch((error) => {
        console.log('Application Failed To Start !!!');
        console.log(error)
    });