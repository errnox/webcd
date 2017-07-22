#encoding: utf-8

module Webcd
  class App
    def info
      content_type 'text/plain'
      id = params[:id] || 0
      {:info => {:id => id, :body => 'This is some informatino'}}.to_json
    end

    def directory_current
      content_type 'text/plain'
      dir = params[:path] || nil
      directory_to_json(dir)
    end

    def directory_parent
      content_type 'text/plain'
      dir = params[:path] || nil
      if !(dir == nil) && !(dir == '/') && !(dir =~ /^\/*$/)
        begin
          dir = File.expand_path('..', dir)
          directory_to_json(dir)
        rescue Exception => e
          {:directory => {:id => 0, :path => dir, :listings =>
              [{:name => nil, :path => nil, :type => nil}]}}.to_json
        end
      else
        {:directory => {:id => 0, :path => nil, :listings =>
            [{:name => nil, :path => nil, :type => nil}]}}.to_json
      end
    end

    private
    def directory_to_json(dir)
      empty_response_object = {:directory => {:id => 0, :path => dir,
          :listings => {
            :name => nil,
            :path => nil,
            :type => nil,
          }}}
      if !(dir == nil)
        if !(dir == '/') && !(dir =~ /^\/*$/)
          dir.gsub!(%r{(\/|\**)\$}, '') # unless dir.strip == '/'
        end
        if File.exists?(dir) && File.ftype(dir) == 'directory'
          dir_listing = []
          Dir.foreach(dir) do |x|
            if !(x == '.' || x == '..')
              # Compensate for rogue strings
              x = x.force_encoding('ISO-8859-1').encode('UTF-8')
              path = "#{dir}#{'/' if dir != '/'}#{x}"
              object = empty_response_object
                .merge({
                         :name =>  x,
                         :path =>  path,
                         :type => File.ftype(path),
                       })
              dir_listing.push(object)
            end
          end
          # Sort alphabetically (case-sensitive)
          dir_listing.sort! { |a, b| a[:name] <=> b[:name] }
          begin
            {:directory => {:id => 0, :path => dir, :listings => dir_listing}}.to_json
            # {:directory => {:listings => dir_listing}}.to_json
          rescue Exception => e
            empty_response_object.to_json
          end
        else
          empty_response_object.to_json
        end
      else
        empty_response_object.to_json
      end
    end
  end
end
