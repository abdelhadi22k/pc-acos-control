var domain

if(process.env.NODE_ENV === 'production'){

}else{
    domain = 'http://localhost:8000'
}

export default domain;