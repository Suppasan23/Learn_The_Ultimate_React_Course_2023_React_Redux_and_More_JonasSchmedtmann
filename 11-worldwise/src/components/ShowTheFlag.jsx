function ShowTheFlag({bool, country}) {
    return (
        <>
            {bool ? 
            <span ><img src={`../flag/${country}.gif`} width={30} height={20} alt={country} /></span>
            :
            <span ><img src={`../app/flag/${country}.gif`} width={30} height={20} alt={country} /></span>
            }
        </>
    )
}

export default ShowTheFlag;
