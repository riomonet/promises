const form = document.querySelector('#form')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.querySelector('#nums')
    res = parceInput(input)
    if (res.length > 0) {
	if (res.length > 1)
	    callApi(res)
	else
	    for( let i = 0; i < 4; i++)
		callApi(res)
	}

    input.value = ""
});



function parceInput(input) {
    const vals = input.value.split(/,| /) //create array out of runes separated by , or space		
    const numArr = vals.map(inp => parseInt(inp,10)) //convert from strings to nums
    const filtered = numArr.filter(x => (!isNaN(x))) //filter out any non number runes
    return filtered;
}


function callApi(arr) {
    const str = arr.toString();
    base = "http://numbersapi.com/" + str + "/?json"
    axios.get(base)
	.then ( res => {
	    addAllToDom(res.data)
	})
    	.catch ( err => console.log("uh oh",err));
}


function addAllToDom( data ) {
    if ( 'text' in data )
	addElements( data.text )
    else
	for ( key in data )
	    addElements( data[key] )
}

function addElements( text ) {
    ul = document.querySelector( '#list' )
    li = document.createElement( 'li' );
    li.innerText = text
    ul.append( li )
}

