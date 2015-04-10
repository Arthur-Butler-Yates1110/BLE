var clicked, imageUrlForBox;
clicked = null;
function show( $selection ) {
    $selection.addClass( 'active' );
}
function hide( $selection ) {
    $selection.removeClass( 'active' );
}
function checkMatches( boxNo, $box, soundUrl ) {
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
            $( '.box' ).addClass( 'revealed' ); // XXX testing please rmove later
            show( $( '.box' ) ); // XXX testing please remove later
            if ( $( '.box' ).not( '.revealed' ).length === 0 ) {
                $( '.main' ).addClass( 'complete' );
                $( 'body' ).append( $( '<audio>' ).attr( 'autoplay', true ).append( $( '<source>' ).attr( { type: 'audio/wav', src: soundUrl } ) ) );
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
function createBoxes( images, soundUrl, levelClass ) {
    images2 = images.concat( images );
    var images2, paras, i;
    paras = '';
    imageUrlForBox = [];
    for( i = 0; i < images2.length; i++ ) {
        paras = paras + '<span class=\'box\'></span>';
    }
    $( '.main' ).html( paras ).addClass( levelClass );
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
        checkMatches( boxNo, $box, soundUrl );
    } );
}
function showDoctors() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ].map( function ( n ) {
        return 'images/doctors/' + n + '.jpg';
    } ), 'http://www.maddmansrealm.com/drwho/tardis/sounds/sounds/Takeoff1.wav', 'doctors' );
}
function showMasters() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ].map( function ( n ) {
        return 'images/masters/' + n + '.jpg';
    } ), 'http://www.maddmansrealm.com/drwho/tardis/sounds/sounds/Eviltard.wav', 'masters' );
}
function showDaleks() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ].map( function ( n ) {
        return 'images/daleks/' + n + '.jpg';
    } ), 'http://www.drwho.org/downloads/wav/baddies/dalek-exterminate.wav', 'daleks' );
}
function showCompanions1() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ].map( function ( n ) {
        return 'images/companions/companions1-2/' + n + '.jpg';
    } ), 'http://www.drwho.org/downloads/wav/Generic%20Dr.%20Who/assistnt.wav', 'companions' );
}
function showCompanions2() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ].map( function ( n ) {
        return 'images/companions/companions3-4/' + n + '.jpg';
    } ), 'http://www.drwho.org/downloads/wav/Generic%20Dr.%20Who/assistnt.wav', 'companions' );
}
function showCompanions3() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map( function ( n ) {
        return 'images/companions/companions5-8/' + n + '.jpg';
    } ), 'http://www.drwho.org/downloads/wav/Generic%20Dr.%20Who/assistnt.wav', 'companions' );
}
function showCompanions4() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ].map( function ( n ) {
        return 'images/companions/companions9-10/' + n + '.jpg';
    } ), 'http://www.drwho.org/downloads/wav/Generic%20Dr.%20Who/assistnt.wav', 'companions' );
}
function showCompanions5() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ].map( function ( n ) {
        return 'images/companions/companions11-12/' + n + '.jpg';
    } ), 'http://www.drwho.org/downloads/wav/Generic%20Dr.%20Who/assistnt.wav', 'companions' );
}
