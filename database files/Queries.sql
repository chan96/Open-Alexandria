--Tags
select * from documents d join taglink tk on d.documents_unique_id = tk.taglink_documents_id join taglist tt on tk.taglink_taglist_id = tt.taglist_unique_id where tt.taglist_text in ('Demo','Cake');
