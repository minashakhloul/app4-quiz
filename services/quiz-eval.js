/**
 * Created by Nabil on 5/21/2015.
 */



function _evaluateur( room  ){
    this.room = room ;
    this.score = 0;
    /*
    * prop_selectionState est un tableau de boolean contient pour chaque propsition si elle est sectioné ou pas
    * */
    this.evaluateCurrentQuestion = function ( prop_selectionState ){

         console.log(prop_selectionState);
        var currentQestion = this.room.quiz.questions[this.room.currentQ];
        console.log(currentQestion.prop);
        if (currentQestion.prop.length != prop_selectionState.length) 
         throw Error("incorrect prop_selectionState.length ");

        var evaluation = true ;
        for (var i = 0 ; i < prop_selectionState.length  && evaluation ; i++){
            var boolAnswer = (prop_selectionState[i] == 'true');
            if (currentQestion.prop[i].value != boolAnswer) evaluation = false ;
        }

        if (evaluation) this.score ++ ;
    };

} // index

exports.ScoreCounter = _evaluateur;

