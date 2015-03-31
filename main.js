var clicked, imageUrlForBox;
clicked = null;
function show( $selection ) {
    $selection.addClass( 'active' );
}
function hide( $selection ) {
    $selection.removeClass( 'active' );
}
function checkMatches( boxNo, $box ) {
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
            $( '.box' ).addClass( 'revealed' ); // XXX Testing please remove later
            show( $( '.box' ) ); // XXX Testing please remove later
            if ( $( '.box' ).not( '.revealed' ).length === 0 ) {
                $( '.main' ).addClass( 'complete' );
                $( 'body' ).append( $( '<audio>' ).attr( 'autoplay', true ).append( $( '<source>' ).attr( { type: 'audio/wav', src: 'http://www.maddmansrealm.com/drwho/tardis/sounds/sounds/Takeoff1.wav' } ) ) );
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
function createBoxes( images ) {
    var images2, paras, i;
    images2 = images.concat( images );
    paras = '';
    imageUrlForBox = [];
    for( i = 0; i < images2.length; i++ ) {
        paras = paras + '<span class=\'box\'></span>';
    }
    $( '.main' ).html( paras );
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
        checkMatches( boxNo, $box );
    } );
}
function showDoctors() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ].map( function ( n ) {
        return 'images/doctors/' + n + '.jpg';
    } ) );
}
function showMasters() {
    createBoxes( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map( function ( n ) {
        return 'images/masters/' + n + '.jpg';
    } ) );
}
