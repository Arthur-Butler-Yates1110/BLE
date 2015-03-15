var images, images2, paras, i, clicked, imageUrlForBox;
clicked = null;
images = [ 'http://troi.org/arthur/1.jpg', 'http://troi.org/arthur/2.jpg', 'http://troi.org/arthur/3.jpg', 'http://troi.org/arthur/4.jpg', 'http://troi.org/arthur/5.jpg', 'http://troi.org/arthur/6.jpg', 'http://troi.org/arthur/7.jpg', 'http://troi.org/arthur/8.jpg', 'http://troi.org/arthur/9.jpg', 'http://troi.org/arthur/10.jpg', 'http://troi.org/arthur/11.jpg', 'http://troi.org/arthur/12.jpg', 'http://troi.org/arthur/13.jpg' ];
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
            $( '.box' ).addClass( 'revealed' ); // XXX testing, please remove later
            show( $( '.box' ) ); // XXX testing, please remove later
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
$( '.box' ).on( 'click', function () {
    var boxNo, $box;
    $box = $( this );
    boxNo = $box.data( 'boxNo' );
    checkMatches( boxNo, $box );
} );
