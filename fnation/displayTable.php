<?php
class displayTable extends ArrayObject {

  public function __construct ( $arrayObject ) {
     parent::__construct ( $arrayObject ); 
  }

  
  /*This function displays the array or array object input to the construtor as an HTML table
  * @return string HTML to be displayed
  */
  public function displayAsTable () {
  //get the iterator from the ArrayObject of the parent
  $iterator = $this->getIterator();
  $output = "<table>";
  while($iterator->valid()) {
    $output .= "<tr><td>" . $iterator->key() . "<td>" . $iterator->current() . "</td></tr>";
    $iterator->next();
  }
  $output .= "</table>";
  return $output;
  }
}


