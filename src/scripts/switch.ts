function switchObjVisibility(query: string) {
    const classes = document.querySelector(query).classList;
    if (classes.contains('switch-div-1')) {
        classes.add('switch-div-2')
        classes.remove('switch-div-1')
    } else if (classes.contains('switch-div-2')) {
        classes.add('switch-div-1')
        classes.remove('switch-div-2')
    } else {
        console.error("The object from the query especified doesn't contain the correct classes!")
    }
}