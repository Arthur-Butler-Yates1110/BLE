var clicked, imageUrlForBox;
clicked = null;
alert( 'How to Play, Click on a box, then click on another, if they do not match then try again, if they do then try for more pairs.' );
function show( $selection ) {
    $selection.addClass( 'active' );
}
function hide( $selection ) {
    $selection.removeClass( 'active' );
}
function checkMatches( boxNo, $box, soundUrl, finishHandler, timeBetweenLevel ) {
    var $oldBox;
    if ( clicked === null ) {
        // Show this card
        clicked = boxNo;
        show( $box );
    } else if ( clicked === boxNo ) {
        // Hide this card
        clicked = null;
        hide( $box );
    } else {
        // Compare the cards, if they are the same, then reveal them, else hide them again
        $oldBox = $( $( '.box' )[ clicked ] );
        show( $box );
        if ( imageUrlForBox[ clicked ] === imageUrlForBox[ boxNo ] ) {
            $oldBox.addClass( 'revealed' );
            $box.addClass( 'revealed' );
            $( '.box' ).addClass( 'revealed' ); // Testing please remove later
            show( $( '.box' ) ); // Testing please remove later
            if ( $( '.box' ).not( '.revealed' ).length === 0 ) {
                $( '.main' ).addClass( 'complete' );
                $( 'body' ).append( $( '<audio>' ).attr( 'autoplay', true ).append( $( '<source>' ).attr( { type: 'audio/wav', src: soundUrl } ) ) );
                setTimeout( finishHandler, timeBetweenLevel );
            }
        } else {
            setTimeout( function () {
                hide( $oldBox );
                hide( $box );
            }, 500 );
        }
        clicked = null;
    }
}
function createBoxes( images, soundUrl, levelClass, finishHandler, timeBetweenLevel ) {
    var images2, paras, i;
    images2 = images.concat( images );
    paras = '';
    imageUrlForBox = [];
    for( i = 0; i < images2.length; i++ ) {
        paras = paras + '<span class=\'box\'></span>';
    }
    $( '.main' ).removeClass().addClass( 'main' ).html( paras ).addClass( levelClass );
    $( '.box' ).each( function ( i ) {
        var imageNum;
        imageNum = parseInt( Math.random() * images2.length );
        imageUrlForBox[ i ] = images2[ imageNum ];
        $( this ).html( '<img src="' + images2[ imageNum ] + '">' );
        $( this ).data( 'boxNo', i );
        images2.splice( imageNum, 1 );
    } );
    $( '.box' ).on( 'click', function () {
        var boxNo, $box;
        $box = $( this );
        boxNo = $box.data( 'boxNo' );
        checkMatches( boxNo, $box, soundUrl, finishHandler, timeBetweenLevel );
    } );
}
function showDoctors() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ].map( function ( n ) {
        return 'images/doctors/' + n + '.jpg';
    } ), 'sounds/Takeoff1.wav', 'doctors', finishMessage, 8000 );
}
function showMasters() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ].map( function ( n ) {
        return 'images/masters/' + n + '.jpg';
    } ), 'sounds/Eviltard.wav', 'masters', showDaleks, 14000 );
}
function showDaleks() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ].map( function ( n ) {
        return 'images/daleks/' + n + '.jpg';
    } ), 'sounds/dalek-exterminate.wav', 'daleks', showDoctors, 1500 );
}
function showCompanions1() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ].map( function ( n ) {
        return 'images/companions/companions1-2/' + n + '.jpg';
    } ), 'sounds/policbox.wav', 'companions1', showCompanions2, 6000 );
}
function showCompanions2() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ].map( function ( n ) {
        return 'images/companions/companions3-4/' + n + '.jpg';
    } ), 'sounds/jp-neverlisten.wav', 'companions2', showCompanions3, 1000 );
}
function showCompanions3() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map( function ( n ) {
        return 'images/companions/companions5-8/' + n + '.jpg';
    } ), 'sounds/assistnt.wav', 'companions3', showCompanions4, 3000 );
}
function showCompanions4() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ].map( function ( n ) {
        return 'images/companions/companions9-10/' + n + '.jpg';
    } ), 'sounds/liz.wav', 'companions4', showCompanions5, 4000 );
}
function showCompanions5() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ].map( function ( n ) {
        return 'images/companions/companions11-12/' + n + '.jpg';
    } ), 'sounds/brigader.wav', 'companions5', showMasters, 2000 );
}
function finishMessage() {
    alert( 'Congratulations, you have completed the game. Well done!');
    $( 'body' ).addClass( 'finished' );
    $( 'body' ).append( $( '<audio>' ).attr( 'autoplay', true ).append( $( '<source>' ).attr( { type: 'audio/wav', src: 'sounds/2ndtheme.wav' } ) ) );
}
