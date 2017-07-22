module Webcd
  class App
    def file_content
      content_type 'text/plain'
      path = params[:path] || nil
      file = ''
      if path != nil
        path.gsub!(%r{(\/|\*)*$}, '')
        begin
          file = {
            :name => File.basename(path),
            :path => path,
            :content => File.read(path)
          }
        rescue Exception => e
          file = nil
        end
      end
      file.to_json
    end
  end
end
