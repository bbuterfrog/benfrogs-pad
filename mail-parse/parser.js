$(document).ready(function() {
        $.ajax ({
            url: 'parser-server-html.php',
            dataType: 'html',
            data: 'content=upload-form',

            success: function (data) {
                $('#upload').html(data);
                $('#submit').click(function() {
                    var filename = $('#uploadedfile').val();
                    var form_data = new FormData();                  
                    var file_data = $('#uploadedfile').prop('files')[0]; 
                    form_data.append('file', file_data)
                    $.ajax ({ 
                        url: 'parser-server-html.php?content=upload-file&mail-file='+filename,
                        dataType: 'html',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: form_data,                         
                        type: 'post',
                        success: function (data) { 
                                $('#headers').html(data);
                                var table = $('#header_table').DataTable ({
                                "ajax": {
                                "url": "parser-server-json.php?content=header-table&mailfile="+filename,
                                    },
                                        dom: 'T<"clear">lfrtip',
 
                                        tableTools: {
                                          "sSwfPath": "//cdn.datatables.net/tabletools/2.2.3/swf/copy_csv_xls_pdf.swf"
                                                  }
                                    });
                                }

                        });
                });
            }
});
});
