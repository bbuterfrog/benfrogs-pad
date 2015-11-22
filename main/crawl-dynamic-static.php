<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta content="IE=edge" http-equiv="X-UA-Compatible">
<meta content="width=device-width, initial-scale=1" name="viewport">
<title>Dymanic Content and Google -- benfrog's pad</title>
<link rel="stylesheet" href="/main/bootstrap/css/bootstrap.min.css">
<link rel='shortcut icon' type='/main/img/png' href='../favicon.png' />
<script src="../main/js/jquery-1.11.3.min.js"></script>
<script src="../main/bootstrap/js/bootstrap.min.js"></script>
<script src="/main/jquery-ui/jquery-ui-1.11.4/jquery-ui.min.js"></script>
<link rel="stylesheet" href="/main/jquery-ui/jquery-ui-1.11.4/jquery-ui.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/r/ju/dt-1.10.8,af-2.0.0,r-1.0.7/datatables.min.css">
<script type="text/javascript" src="https://cdn.datatables.net/r/ju/dt-1.10.8,af-2.0.0,r-1.0.7/datatables.min.js"></script>
<script src="/main/prettify/loader/prettify.js"></script>
<script src="/main/js/common.js"></script>
<script src="/main/js/crawl-dynamic.js"></script>
<link rel="stylesheet" type="text/css" href="/main/css/index.css">
</head>
<body>
<!-- Fixed navbar -->
<div id="header">
<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
   <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" 
         data-target="#navbar-collapse">
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
      </button>
        <a href="/index.html" class="pull-left"><img src="/main/img/cartoon-frog-on-lily-pad.png" id="frog-picture"></a>
          <a class="navbar-brand" href="/index.html">benfrog's pad</a>
    </div>
     <div class="collapse navbar-collapse" id="navbar-collapse">
          <ul class="nav navbar-nav">
                <li><a href="/main/exploding.html">Exploding Tables</a></li>
                <li><a href="/main/self-form.html">Self-Submitting Forms</a></li>
                <li><a href="/main/about.html">About</a></li>
              </ul>
      </div>
    </nav>
</div>
<div id="dynamic-body">
<div class="container">
<p class="lead">Google and Dynamic Content--Does it Work?!</p>
<p>Ever since Google <a href="http://googlewebmastercentral.blogspot.com/2015/10/deprecating-our-ajax-crawling-scheme.html">
quietly announced</a> their intention to index dynamic content without the previous hassle, there has been a great deal of conversation 
and controversy about whether
they actually meant what they said, and if it is even possible to begin with.  I decided the best method to settle this in my own mind 
was to just try and see if it all worked on this very site, where I have little to lose in terms of traffic and thus actual money.</p>  
<p>The body of this very article started out on the server as this:  
<pre class="prettyprint">
&lt;body&gt;
&lt;div id="header"&gt;
         &lt;/div&gt;
         &lt;div id="dymnamic-body"&gt;&lt;/div&gt;
         &lt;footer class="footer"&gt;
      &lt;div class="container"&gt;
         &lt;div id="footer"&gt;
         &lt;/div&gt;
      &lt;/div&gt;
    &lt;/footer&gt;
&lt;/body&gt;
</pre>
<p>I didn't bother to do anything else to it on the server, I delivered it to the client as literally a blank collection of div's to see 
if our friends at Google meant what they said about indexing it that way.  I'm using my normal set of tools (in case anyone's interested) 
to fetch all of the HTML client-side as individual files.  This might not be a perfect method, but it keeps the files as "pure" HTML.  Here's
the JS:
<pre class="prettyprint">
function getHeader ( ) {
	$.ajax ({
		   url: '../main/php/serverHTML.php?type=HTML&content=header',
		   beforeSend: showLoadingImage ('header'),
		   contentType : 'html',
		   
	   })
	   .done (function ( content ) {
		   $('#header').html(content);
});
}

function getHTML (div, content){
   $.ajax ({
	   url: '../main/php/serverHTML.php?type=HTML&content=' + content,
	   beforeSend: showLoadingImage (div),
	   contentType : 'html',
	   
   })
   .done (function ( content ) {
	   $('#'+div).html(content);
   }); 
}

function showLoadingImage (div) {
	$('#'+div).html('&lt;center&gt;&lt;img src="../main/img/loading.gif"&gt;&lt;/img&gt;&lt;/center&gt;');
}
</pre>
And here's the PHP function that serves up the content to the client:
<pre class="prettyprint">
		
	/** This function simply gets static html from a given file via
	 * a file_get_contents (simplest case for this class)
	 * 
	 * @param $page (string): html filename (without .html on the end) of
	 * web page you want (no path)
	 * @return: (html), web page contents you want
	 */
	public function getHTML ( $page ) {
        $filename = "../" . $page . ".html";
		return file_get_contents ($filename);
	}
</pre>
It all cries out for a micro-framework to do what really amounts to the work I'm doing here myself, but anyway...
<p>So, getting back to the larger picture here, let's submit what we have in this page so far to Google's latest version of their "Fetch
As Googlebot" tool:</p>
<img src="img/googlebot-benfrog-net.PNG" alt="Googlebot's View of benfrog.net"></img>
<p>Wow! That looks just like Google said it would!  It's precisely like the view from, well, a modern browser.  I guess it's time for the
conspiracy theroists to put away their tinfoil hats again.</p>
<p>There's also the "why bother" question here.  What does anyone buy with these silly blank pages?  Well, let's compare speed between 
this dynamic page and this same page rendered with a "traditional" static method.  
<a href="crawl-dynamic-static.php">Here's</a> that page (and here's a link
to all of the server-side code).  
<p>This still begs the other practical question of how in the heck you'd make a crawlable, say, search page from this.  This really isn't 
impossible if you take in HTML and do subsititutions client-side in JS from JSON.  Yes, you can do this from requests.  Stay tuned to this
space...</p>
</div>
</div></body>
</html>
