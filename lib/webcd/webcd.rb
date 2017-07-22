require 'json'
require 'sinatra'
require 'sinatra/rroute'

require_relative 'version'


module Webcd
  class App < Sinatra::Base
    configure do
      register Sinatra::Rroute
    end
  end

  require_relative 'routes/init'
  require_relative 'controllers/init'
end
