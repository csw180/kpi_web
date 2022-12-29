<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><?xml version="1.0" encoding="UTF-8" ?>
<%
    int intInqCount     = request.getParameter("inq_text")==null ? 0 : request.getParameterValues("inq_text").length;
    int intStartRow     = intInqCount + 5;
    int intRowRepeatRow = intStartRow + Integer.parseInt(request.getParameter("head_rows"));
%>
<Excel>
  <IBSheetSet>
    <StartRow><%=intStartRow%></StartRow>
  </IBSheetSet>  
  <PageSet>
    <Scaling>
      <Adjust Value="100">true</Adjust>
      <Fit Height="1" Width="1">true</Fit>
    </Scaling>
    <RowsRepeat Row1="<%=intRowRepeatRow%>" Row2="<%=intRowRepeatRow%>"/>
    <DefaultRowHeight>18</DefaultRowHeight>
    <DefaultFont Name="돋움" size="9"/>
  </PageSet>
<%
    for(int i=0; request.getParameterValues("column_width")!=null && i<request.getParameterValues("column_width").length; i++)
    {
%><ColumnWidth Col1="<%=i+1%>"><%=Integer.parseInt(request.getParameterValues("column_width")[i])/8%></ColumnWidth>            
<%  }
%><Label>
    <Range Row1="1" Col1="1" Row2="1" Col2="End" RowHeight="40">
      <CellFormat>
        <Merge>true</Merge>
        <Alignment Horizontal="Center" Vertical="Center"/>        
        <Interior BackColor="192,192,192"/>
        <Font Name="굴림" Bold="True" Size="15"/>
      </CellFormat>
      <InputText><![CDATA[<%=request.getParameter("title_text")%>]]></InputText>
      <BorderStyle>
        <TopEdge    Style="Continuous" Weight="Medium"/>
        <BottomEdge Style="Continuous" Weight="Medium"/>
      </BorderStyle>      
    </Range>
  </Label>
<%
    for(int i=0; i<intInqCount; i++)
    {
%><Label>
    <Range Row1="<%=i+4%>"
           Col1="1"
           Row2="<%=i+4%>"
           Col2="3"
           RowHeight="15">
      <CellFormat>
        <Merge>true</Merge>
        <Alignment Horizontal="Left"
                   Vertical="Center"/>        
        <Font Name="굴림" Size="9"/>
      </CellFormat>
      <InputText><![CDATA[<%=request.getParameterValues("inq_text")[i]%> : <%=request.getParameterValues("inq_value")[i]%>]]></InputText>
    </Range>
  </Label><%
    }
%><Label>
    <Range Row1="<%=intStartRow-1%>"           
           Col1="<%=request.getParameterValues("column_width").length -1%>"
           Row2="<%=intStartRow-1%>"
           Col2="End"
           RowHeight="15">
      <CellFormat>
        <Merge>true</Merge>
        <Alignment Horizontal="Right"
                   Vertical="Center"/>        
        <Font Name="굴림" Bold="True" Size="9"/>
      </CellFormat>
      <InputText><![CDATA[<%=request.getParameter("unit_text")%>]]></InputText>
    </Range>
  </Label> 
</Excel>