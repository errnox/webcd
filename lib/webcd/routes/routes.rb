module Webcd
  class App
    nnamespace '/api' do

      # Directories
      gget '/directories/?' => :directory_current, :as =>
        :current_directory_path ,:mask => '/directory'
      gget '/parent/?' => :directory_parent, :as =>
        :parent_directory_path , :mask => '/parent'

      # Files
      gget '/file/?' => :file_content, :as =>
        :file_path, :mask => '/file'

      # Info
      gget '/infos/:id?' => :info, :as =>
        :info_path, :mask => '/info'

    end
  end
end
